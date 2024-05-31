import Foundation

struct CartItem: Identifiable, Decodable {
    let id: String
    let product: Product
    let quantity: Int
}
