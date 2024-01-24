package main

import (
	"fmt"
	"log"
	"net/http"

	"server.go/router"
)

func main() {
	router := router.Router()
	fmt.Println("Server Starting at 3001")
	log.Fatal(http.ListenAndServe(":3001", router))
}
