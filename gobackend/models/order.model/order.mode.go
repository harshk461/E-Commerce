package ordermodel

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ShippingInfo  ShippingInfo       `json:"shippingInfo" bson:"shippingInfo"`
	OrderItems    []OrderItem        `json:"orderItems" bson:"orderItems"`
	User          User               `json:"user" bson:"user"`
	PaymentInfo   PaymentInfo        `json:"paymentInfo" bson:"paymentInfo"`
	PaidAt        time.Time          `json:"paidAt" bson:"paidAt"`
	ItemsPrice    float64            `json:"itemsPrice" bson:"itemsPrice"`
	TaxPrice      float64            `json:"taxPrice" bson:"taxPrice"`
	ShippingPrice float64            `json:"shippingPrice" bson:"shippingPrice"`
	TotalPrice    float64            `json:"totalPrice" bson:"totalPrice"`
	OrderStatus   string             `json:"orderStatus" bson:"orderStatus"`
	DeliveredAt   *time.Time         `json:"deliveredAt,omitempty" bson:"deliveredAt,omitempty"`
	CreatedAt     time.Time          `json:"createdAt" bson:"createdAt"`
}

type ShippingInfo struct {
	Name        string `json:"name" bson:"name"`
	Address     string `json:"address" bson:"address"`
	City        string `json:"city" bson:"city"`
	State       string `json:"state" bson:"state"`
	Country     string `json:"country" bson:"country"`
	PinCode     int    `json:"pinCode" bson:"pinCode"`
	PhoneNumber int    `json:"phoneNumber" bson:"phoneNumber"`
}

type OrderItem struct {
	Product  string  `json:"product" bson:"product"`
	Name     string  `json:"name" bson:"name"`
	Price    float64 `json:"price" bson:"price"`
	Image    string  `json:"image" bson:"image"`
	Quantity int     `json:"quantity" bson:"quantity"`
}

type User struct {
	ID    string `json:"user_id" bson:"user_id"`
	Name  string `json:"name" bson:"name"`
	Email string `json:"email" bson:"email"`
}

type PaymentInfo struct {
	ID     string `json:"id" bson:"id"`
	Status string `json:"status" bson:"status"`
}
