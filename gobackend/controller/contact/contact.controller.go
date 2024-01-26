package contact

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	contactmodel "server.go/models/contact.model"
)

const dbName = "Ecommerce"
const colName = "contacts"

var contactCollection *mongo.Collection

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
	contactCollection = client.Database(dbName).Collection(colName)

	//collection
	fmt.Println("Contact Collection is ready")
}

func NewMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var newmessage contactmodel.Message

	if err := json.NewDecoder(r.Body).Decode(&newmessage); err != nil {
		fmt.Println(newmessage)
		msg := map[string]string{"status": "error", "message": "Invalid JSON"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	fmt.Println(newmessage)
	_, err := contactCollection.InsertOne(context.Background(), newmessage)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Error During Sending"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]string{"status": "success", "message": "Send Successfully"}
	json.NewEncoder(w).Encode(msg)
}
