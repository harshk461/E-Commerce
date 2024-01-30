package product

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	productModel "server.go/models/product.model"
)

const dbName = "Ecommerce"
const colName = "products"

var productCollection *mongo.Collection

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
	productCollection = client.Database(dbName).Collection(colName)

	//collection
	fmt.Println("Product Collection is ready")
}

func GetAllProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var products []productModel.Product

	data, err := productCollection.Find(context.Background(), bson.D{})

	if err != nil {
		msg := map[string]string{"status": "error", "message": "Error Retriving Data"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	defer data.Close(context.Background())

	for data.Next(context.Background()) {
		var product productModel.Product
		if err := data.Decode(&product); err != nil {
			msg := map[string]string{"status": "error", "message": "Error decoding data"}
			json.NewEncoder(w).Encode(msg)
			return
		}
		products = append(products, product)
	}

	if err := data.Err(); err != nil {
		msg := map[string]string{"status": "error", "message": "Error iterating over results"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func GetProductByCategory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var products []productModel.Product

	vars := mux.Vars(r)
	category := vars["category"]
	filter := bson.D{{"category", category}}

	data, err := productCollection.Find(context.Background(), filter)

	if err != nil {
		msg := map[string]string{"status": "error", "message": "Error Retriving Data"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	defer data.Close(context.Background())

	for data.Next(context.Background()) {
		var product productModel.Product
		if err := data.Decode(&product); err != nil {
			msg := map[string]string{"status": "error", "message": "Error decoding data"}
			json.NewEncoder(w).Encode(msg)
			return
		}
		products = append(products, product)
	}

	if err := data.Err(); err != nil {
		msg := map[string]string{"status": "error", "message": "Error iterating over results"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func GetProductByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var product productModel.Product

	vars := mux.Vars(r)
	productId := vars["product_id"]

	objID, err := primitive.ObjectIDFromHex(productId)
	if err != nil {
		// If the conversion fails, return an error response
		errorResponse := map[string]string{"status": "error", "message": "Invalid product ID format"}
		json.NewEncoder(w).Encode(errorResponse)
		return
	}

	filter := bson.D{{"_id", objID}}
	result := productCollection.FindOne(context.Background(), filter)

	if err := result.Decode(&product); err != nil {
		// If product not found, return an error response
		// w.WriteHeader(http.StatusNotFound)
		errorResponse := map[string]string{"status": "error", "message": "Product not found"}
		json.NewEncoder(w).Encode(errorResponse)
		return
	}

	json.NewEncoder(w).Encode(product)
}

type ReviewBody struct {
	User        string `json:"user" bson:"user"`
	ProductID   string `json:"product_id" bson:"product_id"`
	ReviewTitle string `json:"title" bson:"title"`
	Rating      int    `json:"rating" bson:"rating"`
	Message     string `json:"message" bson:"message"`
}

func AddReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "PATCH")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var request ReviewBody

	json.NewDecoder(r.Body).Decode(&request)

	data := map[string]any{
		"user":    request.User,
		"title":   request.ReviewTitle,
		"message": request.Message,
		"rating":  request.Rating,
	}

	filter := bson.D{{"_id", request.ProductID}}

	update := bson.D{
		{"$push", bson.D{
			{"reviews", data},
		}},
	}

	_, err := productCollection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Review added successfully"})
}
