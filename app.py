import os
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="Frontend/dist", static_url_path="")

# Mock Database
db = {
    "products": [
        {"id": 1, "name": "Sample Product", "price": 9.99, "qty": 100}
    ],
    "orders": []
}

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json or {}
    if data.get("username") == "admin" and data.get("password") == "password":
        return jsonify({"ok": True, "message": "Logged in"})
    return jsonify({"ok": False, "error": "Invalid credentials"})

@app.route("/api/products", methods=["GET", "POST"])
def handle_products():
    if request.method == "GET":
        return jsonify({"ok": True, "products": db["products"]})
    else:
        # POST
        data = request.json or {}
        req_keys = ["id", "name", "price", "qty"]
        if not all(k in data for k in req_keys):
            return jsonify({"ok": False, "error": "Missing fields"}), 400
        
        # Check if ID already exists
        if any(p["id"] == data["id"] for p in db["products"]):
            return jsonify({"ok": False, "error": "Product ID already exists"}), 400
            
        db["products"].append({
            "id": data["id"],
            "name": data["name"],
            "price": data["price"],
            "qty": data["qty"]
        })
        return jsonify({"ok": True})

@app.route("/api/products/<int:pid>", methods=["DELETE"])
def delete_product(pid):
    prev_len = len(db["products"])
    db["products"] = [p for p in db["products"] if p["id"] != pid]
    if len(db["products"]) < prev_len:
        return jsonify({"ok": True})
    return jsonify({"ok": False, "error": "Product not found"}), 404

@app.route("/api/orders", methods=["GET", "POST"])
def handle_orders():
    if request.method == "GET":
        return jsonify({"ok": True, "ordered": db["orders"]})
    else:
        # POST
        data = request.json or {}
        pid = data.get("id")
        qty = data.get("qty")
        
        product = next((p for p in db["products"] if p["id"] == pid), None)
        if not product:
            return jsonify({"ok": False, "error": "Product not found"}), 404
        if product["qty"] < qty:
            return jsonify({"ok": False, "error": "Not enough inventory"}), 400
            
        # Deduct quantity
        product["qty"] -= qty
        
        # Add to orders
        db["orders"].append({
            "id": pid,
            "name": product["name"],
            "ordered_qty": qty
        })
        return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(debug=True)