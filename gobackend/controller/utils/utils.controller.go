package utils

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

var promoCodes = map[string]int{
	"sale10":          10,
	"summer20":        20,
	"customerspecial": 15,
}

func CheckPromoCode(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	promoCode := vars["promo"]
	discount, exists := promoCodes[promoCode]

	if !exists {
		// Promo code not found
		errorResponse := map[string]string{"status": "error", "message": "Invalid promo code"}
		json.NewEncoder(w).Encode(errorResponse)
		return
	}

	// Promo code found, respond with the discount percentage
	response := map[string]interface{}{"status": "success", "discount": discount}
	json.NewEncoder(w).Encode(response)
}
