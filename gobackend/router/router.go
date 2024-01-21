package router

import (
	"net/http"

	"github.com/gorilla/mux"
	"server.go/controller/auth"
)

func Router() http.Handler {
	router := mux.NewRouter()

	//auth routes
	router.HandleFunc("/auth/login", auth.Login).Methods("POST")
	router.HandleFunc("/auth/sign-up", auth.SignUp).Methods("POST")
	router.HandleFunc("/auth/forgot-password", auth.ForgotPassword).Methods("POST")

	return router
}
