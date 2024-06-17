import Foundation

struct CartItem: Identifiable, Decodable {
    let id: String
    let product_id: String
    let quantity: Int
}
