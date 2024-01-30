package order

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
	ordermodel "server.go/models/order.model"
)

const dbName = "Ecommerce"
const colName = "orders"

var orderCollection *mongo.Collection

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
	orderCollection = client.Database(dbName).Collection(colName)

	//collection
	fmt.Println("Order Collection is ready")
}

func GetOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	userID := vars["user_id"]

	filter := bson.D{{"user.user_id", userID}}
	cursor, err := orderCollection.Find(context.Background(), filter)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Invalid User"}
		json.NewEncoder(w).Encode(msg)
		return
	}
	defer cursor.Close(context.Background())

	var orders []ordermodel.Order

	for cursor.Next(context.Background()) {
		var order ordermodel.Order
		if err := cursor.Decode(&order); err != nil {
			// Handle decoding error
			continue
		}
		orders = append(orders, order)
	}

	if err := cursor.Err(); err != nil {
		// Handle cursor error
		msg := map[string]string{"status": "error", "message": "Error retrieving orders"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Handle the orders slice as needed
	json.NewEncoder(w).Encode(orders)
}

func GetOrderByOrderID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	orderID := vars["order_id"]

	objID, err := primitive.ObjectIDFromHex(orderID)
	if err != nil {
		// If the conversion fails, return an error response
		errorResponse := map[string]string{"status": "error", "message": "Invalid product ID format"}
		json.NewEncoder(w).Encode(errorResponse)
		return
	}

	filter := bson.D{{"_id", objID}}
	var order ordermodel.Order

	result := orderCollection.FindOne(context.Background(), filter)

	if err := result.Decode(&order); err != nil {
		// If product not found, return an error response
		// w.WriteHeader(http.StatusNotFound)
		errorResponse := map[string]string{"status": "error", "message": "Product not found"}
		json.NewEncoder(w).Encode(errorResponse)
		return
	}

	json.NewEncoder(w).Encode(order)
}
