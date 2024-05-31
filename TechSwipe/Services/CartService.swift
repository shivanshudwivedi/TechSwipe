import Foundation

class CartService {
    
    func fetchCartItems(completion: @escaping (Result<[CartItem], Error>) -> Void) {
        guard let url = URL(string: "http://localhost:3000/api/cart") else { return }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let cartItems = try JSONDecoder().decode([CartItem].self, from: data)
                    DispatchQueue.main.async {
                        completion(.success(cartItems))
                    }
                } catch {
                    DispatchQueue.main.async {
                        completion(.failure(error))
                    }
                }
            } else if let error = error {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
    
    func addToCart(_ product: Product, completion: @escaping (Result<[CartItem], Error>) -> Void) {
        guard let url = URL(string: "http://localhost:3000/api/cart") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "productId": product.id,
            "quantity": 1
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data {
                do {
                    let cartItems = try JSONDecoder().decode([CartItem].self, from: data)
                    DispatchQueue.main.async {
                        completion(.success(cartItems))
                    }
                } catch {
                    DispatchQueue.main.async {
                        completion(.failure(error))
                    }
                }
            } else if let error = error {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
    
    func removeFromCart(_ cartItem: CartItem, completion: @escaping (Result<[CartItem], Error>) -> Void) {
        guard let url = URL(string: "http://localhost:3000/api/cart/\(cartItem.id)") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data {
                do {
                    let cartItems = try JSONDecoder().decode([CartItem].self, from: data)
                    DispatchQueue.main.async {
                        completion(.success(cartItems))
                    }
                } catch {
                    DispatchQueue.main.async {
                        completion(.failure(error))
                    }
                }
            } else if let error = error {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
