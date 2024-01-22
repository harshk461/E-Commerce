package router

import (
	"net/http"

	"github.com/gorilla/mux"
	"server.go/controller/auth"
	"server.go/controller/product"
)

func Router() http.Handler {
	router := mux.NewRouter()

	//auth routes
	router.HandleFunc("/auth/login", auth.Login).Methods("POST")
	router.HandleFunc("/auth/sign-up", auth.SignUp).Methods("POST")
	router.HandleFunc("/auth/forgot-password", auth.ForgotPassword).Methods("POST")

	//product routes
	router.HandleFunc("/products/get", product.GetAllProducts).Methods("GET")
	router.HandleFunc("/products/get/{category}", product.GetProductByCategory).Methods("GET")
	router.HandleFunc("/products/get/one/{product_id}", product.GetProductByID).Methods("GET")
	router.HandleFunc("/products/add-review", product.AddReview).Methods("PATCH")
	return router
}
