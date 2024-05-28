import Foundation
import FirebaseFirestoreInternal //should be Firestore'




class ProductService {
    private let db = Firestore.firestore()
    
    func fetchProducts(completion: @escaping (Result<[Product], Error>) -> Void) {
        db.collection("products").getDocuments { snapshot, error in
            if let error = error {
                completion(.failure(error))
            } else {
                let products = snapshot?.documents.compactMap { document -> Product? in
                    let data = document.data()
                    guard let id = document.documentID as? String,
                          let name = data["name"] as? String,
                          let description = data["description"] as? String,
                          let price = data["price"] as? Double else {
                        return nil
                    }
                    return Product(id: id, name: name, description: description, price: price)
                } ?? []
                completion(.success(products))
            }
        }
    }
}
