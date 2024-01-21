package main

import (
	"fmt"
	"log"
	"net/http"

	"server.go/router"
)

func main() {
	router := router.Router()
	fmt.Println("Server Starting at 6000")
	log.Fatal(http.ListenAndServe(":6000", router))
}
