package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	authmodel "server.go/models/auth.model"
)

const dbName = "Ecommerce"
const colName = "users"

var authCollection *mongo.Collection

func init() {
	godotenv.Load(".env")
	var mongoURI string = os.Getenv("MONGO_URI")

	//client option
	clientOptions := options.Client().ApplyURI(mongoURI)

	//connect to MONGO
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Mongo Database connected")
	authCollection = client.Database(dbName).Collection(colName)

	//collection
	fmt.Println("Auth COllection is ready")
}

type User struct {
	Email    string `bson:"email"`
	Password string `bson:"password"`
}

type SignUpUser struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	Name     string `json:"name" bson:"name"`
	Username string `json:"username" bson:"username"`
}

func loginController(email, password string) (bool, *authmodel.User) {
	filter := bson.D{{Key: "email", Value: email}}
	login_data, err := authCollection.Find(context.Background(), filter)

	if err != nil {
		// Handle database query error
		return false, nil
	}

	defer login_data.Close(context.Background())

	for login_data.Next(context.Background()) {
		var user authmodel.User
		if err := login_data.Decode(&user); err != nil {
			// Handle decoding error
			return false, nil
		}

		// Compare the stored hashed password with the provided password
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			// Handle incorrect password
			return false, nil
		}

		// Password is correct, return the user
		return true, &user
	}

	// User not found
	return false, nil
}

func createToken(email string, username string, id string) (string, error) {
	var secretKey = []byte(os.Getenv("secretKey"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"email":    email,
			"username": username,
			"id":       id,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var logindata User

	err := json.NewDecoder(r.Body).Decode(&logindata)
	if err != nil {
		errMsg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(errMsg)
		return
	}

	success, user := loginController(logindata.Email, logindata.Password)

	if !success {
		msg := map[string]string{"status": "error", "message": "User not found or incorrect password"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	token, err := createToken(user.Email, user.Username, string(user.ID.Hex()))

	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]interface{}{"status": "sucess", "message": "User found", "token": token}

	json.NewEncoder(w).Encode(msg)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var newUser SignUpUser
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		msg := map[string]string{"status": "error", "message": "Invalid JSON"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Check if user with the given email already exists
	emailFilter := bson.D{{Key: "email", Value: newUser.Email}}
	existingEmailUser := authCollection.FindOne(context.Background(), emailFilter)

	if existingEmailUser.Err() == nil {
		msg := map[string]string{"status": "error", "message": "Email Already Exists"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Check if user with the given username already exists
	usernameFilter := bson.D{{Key: "username", Value: newUser.Username}}
	existingUsernameUser := authCollection.FindOne(context.Background(), usernameFilter)

	if existingUsernameUser.Err() == nil {
		msg := map[string]string{"status": "error", "message": "Username Already Exists"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Hash the password before storing it in the database
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}
	newUser.Password = string(hashedPassword)

	_, err = authCollection.InsertOne(context.Background(), newUser)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]string{"status": "success", "message": "User Registered Successfully"}
	json.NewEncoder(w).Encode(msg)
}

type ForgotBody struct {
	Email string `json:"email" bson:"email"`
}

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var email ForgotBody
	err := json.NewDecoder(r.Body).Decode(&email)

	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	filter := bson.D{{Key: "email", Value: email.Email}}
	existingUser := authCollection.FindOne(context.Background(), filter)

	if existingUser.Err() != nil {
		msg := map[string]string{"status": "error", "message": "User not found"}
		json.NewEncoder(w).Encode(msg)
		return
	}

}
