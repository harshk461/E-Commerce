package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
	Address  []Address          `json:"addresses,omitempty" bson:"addresses,omitempty"`
	Cart     []CartItem         `json:"cart,omitempty" bson:"cart,omitempty"`
}

type Address struct {
	ID          primitive.ObjectID `json:"address_id,omitempty" bson:"address_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Address     string             `json:"address" bson:"address"`
	City        string             `json:"city" bson:"city"`
	State       string             `json:"state" bson:"state"`
	Country     string             `json:"country" bson:"country"`
	PinCode     int                `json:"pinCode" bson:"pinCode"`
	PhoneNumber int                `json:"phoneNumber" bson:"phoneNumber"`
}

type CartItem struct {
	ProductID primitive.ObjectID `json:"product_id,omitempty" bson:"product_id,omitempty"`
	Name      string             `json:"product_name" bson:"product_name"`
	Price     float64            `json:"price" bson:"price"`
	Quantity  int                `json:"quantity,omitempty" bson:"quantity,omitempty"`
}
