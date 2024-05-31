import Foundation

struct Product: Identifiable, Decodable {
    let id: String
    let name: String
    let description: String
    let price: Double
    let category: String
}
