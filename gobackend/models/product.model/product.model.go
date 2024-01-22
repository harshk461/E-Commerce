package productModel

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name" bson:"name" validate:"required"`
	Description  string             `json:"description" bson:"description" validate:"required"`
	Price        float64            `json:"price" bson:"price" validate:"required"`
	Ratings      int                `json:"ratings,omitempty" bson:"ratings,omitempty"`
	Images       []Image            `json:"images" bson:"images"`
	Category     string             `json:"category" bson:"category" validate:"required"`
	Stock        int                `json:"stock" bson:"stock" validate:"required"`
	NumOfReviews int                `json:"numOfReviews,omitempty" bson:"numOfReviews,omitempty"`
	Reviews      []Review           `json:"reviews" bson:"reviews"`
	CreatedAt    time.Time          `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Trending     bool               `json:"trending,omitempty" bson:"trending,omitempty"`
}

type Image struct {
	PublicID string `json:"public_id" bson:"public_id" validate:"required"`
	URL      string `json:"url" bson:"url" validate:"required"`
}

type Review struct {
	User        primitive.ObjectID `json:"user" bson:"user" validate:"required"`
	ReviewTitle string             `json:"title" bson:"title" validate:"required"`
	Rating      int                `json:"rating" bson:"rating" validate:"required"`
	Message     string             `json:"message" bson:"message" validate:"required"`
}
