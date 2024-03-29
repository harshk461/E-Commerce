package router

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"server.go/controller/auth"
	"server.go/controller/contact"
	"server.go/controller/order"
	"server.go/controller/product"
	"server.go/controller/utils"
)

func Router() http.Handler {
	router := mux.NewRouter()

	//auth routes
	router.HandleFunc("/auth/login", auth.Login).Methods("POST")
	router.HandleFunc("/auth/sign-up", auth.SignUp).Methods("POST")
	router.HandleFunc("/auth/forgot-password", auth.ForgotPassword).Methods("POST")
	router.HandleFunc("/auth/get-address/{user_id}", auth.GetAllAddresses).Methods("GET")
	router.HandleFunc("/auth/add-address", auth.AddAddress).Methods("PATCH")
	router.HandleFunc("/auth/remove-address", auth.RemoveAddress).Methods("PATCH")
	router.HandleFunc("/auth/add-cart", auth.AddToCart).Methods("PATCH")
	router.HandleFunc("/auth/remove-cart", auth.RemoveFromCart).Methods("PATCH")
	router.HandleFunc("/auth/get-all-orders/{user_id}", auth.GetAllProductFromCart).Methods("GET")

	//product routes
	router.HandleFunc("/products/get", product.GetAllProducts).Methods("GET")
	router.HandleFunc("/products/get/{category}", product.GetProductByCategory).Methods("GET")
	router.HandleFunc("/products/get/one/{product_id}", product.GetProductByID).Methods("GET")
	router.HandleFunc("/products/add-review", product.AddReview).Methods("PATCH")

	//contact
	router.HandleFunc("/contact", contact.NewMessage).Methods("POST")

	//orders
	router.HandleFunc("/order/get/{user_id}", order.GetOrders).Methods("GET")
	router.HandleFunc("/order/get-order/{order_id}", order.GetOrderByOrderID).Methods("GET")

	//utils
	router.HandleFunc("/utils/{promo}", utils.CheckPromoCode).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PATCH", "DELETE"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	})

	handler := c.Handler(router)

	return handler
}
