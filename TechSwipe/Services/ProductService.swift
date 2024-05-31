import Foundation

class ProductService {
    func fetchProducts(completion: @escaping (Result<[Product], Error>) -> Void) {
        guard let url = URL(string: "http://localhost:3000/api/products") else { return }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let products = try JSONDecoder().decode([Product].self, from: data)
                    DispatchQueue.main.async {
                        completion(.success(products))
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
    
    func searchProducts(query: String, completion: @escaping (Result<[Product], Error>) -> Void) {
        guard let url = URL(string: "http://localhost:3000/api/products/search?name=\(query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")") else { return }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let products = try JSONDecoder().decode([Product].self, from: data)
                    DispatchQueue.main.async {
                        completion(.success(products))
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
