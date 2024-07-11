/*
 * ----------------------------------
 * Experiment: Declaring array types.
 * ----------------------------------
 */

const pets: string[] = ['dog', 'cat', 'hamster', 'parrot', 'goldfish']
const rivers: Array<string> = ['Nile', 'Amazon', 'Mississippi', 'Yangtze', 'Ganges'] // unconvinient
const person: [string, number] = ['John Doe', 42] // types and length are fixed
const sizes: (number|string)[] = ['small', 42, 'medium', 'large', 43, 44]

/*
 * ------------------------------------------------
 * Experiment: Declaring types with defined values.
 * ------------------------------------------------
 */

type Car = 'cabrio' | 'pickup' | 'suv'

enum Color {
    RED,
    GREEN,
    BLUE
}

enum WEATHER {
    RAIN = "rain",
    SUN = "sun",
    WIND = "wind"
}

const car: Car = 'cabrio' 
const color: Color = Color.RED
const weather: WEATHER = WEATHER.SUN

console.log('car:', car)
console.log('color:', color)
console.log('weather:', weather, '\n')

/*
 * -------------------------------
 * Experiment: null vs. undefined.
 * -------------------------------
 */

interface Motorcycle {
    name: string
    color: string | null
}

interface Bicycle {
    name: string
    color?: string
}

// It's not possible leave out the 'color' property.
const motorcycle: Motorcycle = {
    name: 'Speedmaster',
    color: null
}

// AS 'color' property is optional, no error is caused, when leaving it out.
const bicycle: Bicycle = {
    name: 'Cyclemaster',
}

/*
 * -------------------------------
 * Experiment: type vs. interface.
 * -------------------------------
 */

// Union types can only be realized by type aliases. 
type Category = 'food' | 'clothes' | 'electronics'

// Interfaces can be declared multiple times. 
// Makes it possible to extend the definition of an interface.  
interface Shop {
    name: string
    desc: string
}

interface Shop {
    name: string
    desc: string
    isOpen: boolean
}

// Intersection types can be realized by type aliases.
// It's possible to compose interfaces and type aliases.
type Address = {
    street: string
    number: number
    city: string
}

type ShopFull = Shop & Address

const shop: ShopFull = {
    name: 'Supermarket',
    desc: 'Food and beverages',
    isOpen: true,
    street: 'Main Street',
    number: 42,
    city: 'New York'
}

/*
 * ---------------------------
 * Experiment: any vs. unkown.
 * ---------------------------
 */

const kitchen: any = {
    size: 15
}

const floor: unknown = {
    size: 8
}

// 'any' turns off type checking and allows accessing the object.
console.log('kitchen:', kitchen.size)

// 'unknown' type does not allow to access the object.
console.log('floor:', floor, '\n')

/*
 * ------------------------------------------------------
 * Experiment: TypeScript and JavaScript type conversion.
 * ------------------------------------------------------
 */

const streetName: string = 'Park Avenue'
const streetNumber: number = 42
let streetFull: string

// Concatenation of string and number still possible.
// Would cause an error, when 'streetFull' would not be type of 'string'.
streetFull = `${streetName} ${streetNumber}`

console.log('streetFull:', streetFull, '\n')

/*
 * ------------------------------
 * Experiment: Structural typing.
 * ------------------------------
 */

interface Shoe {
    name: string
    size: number
}

interface Hat {
    name: string
    size: number
}

interface Pant {
    color: string
    name: string
    size: number
}

interface Knit {
    color: string
    name: string
    size: number
    desc?: string
}

const shoe: Shoe = {
    name: 'Sneaker',
    size: 43
}

const hat: Hat = {
    name: 'Beanie',
    size: 7
}

const pant: Pant = {
    name: 'Shorts',
    size: 32,
    color: 'blue'
}

const getShoe = (shoe: Shoe): Shoe => shoe  
const getHat = (shoe: Hat): Hat => shoe
const getPant = (pant: Pant): Pant => pant

// No errors caused as type 'Shoe' and 'Hat' are the same in structure.
console.log('shoe:', getShoe(hat))
console.log('hat:', getHat(shoe))

// No error caused as type 'Pant' contains the same structure as type 'Shoe'.
console.log('shoe:', getShoe(pant), '\n')

/*
 * -------------------------------------------------
 * Experiment: Generic declarations for object types
 * -------------------------------------------------
 */

interface Playlist {
    [key: number]: string
}

type Menu = Record<number, string>

const playlist: Playlist = {
    1: 'Night Fever',
    2: 'Highway to Hell',
    3: 'Radio Ga Ga',
}

const menu: Menu = {
    1: 'Pizza',
    2: 'Cake',
    3: 'Salad'
}

// Approach to define a object type that accepts all valid key/value pairings. 
// 'PropertyKey' expresses all valid values that can be used as keys.
type Random = Record<PropertyKey, unknown>

const random: Random = { 
    name: 'John Doe',
    4: 'four',
    'two': 2,
    // and so on...
}

/*
 * ------------------------------------------------
 * Experiment: Defining and applying generic types.
 * ------------------------------------------------
 */

// 'T' is a placeholder for the type that will be passed in, when applying the interface.
interface Cart<T> {
    items: T
}

const cartString: Cart<string[]> = {
    items: ['apple', 'banana', 'orange']
}

const cartNumber: Cart<number[]> = {
    items: [14127912, 28194672, 46291846]
}

const cartMixed: Cart<(number|string)[]> = {
    items: ['apple', 28194672, 'orange', ]
}

// Demo how to use generics in functions.
const getCartItems = <T>(cart: Cart<T>): T => cart.items

console.log('cartString:', getCartItems(cartString))
console.log('cartNumber:', getCartItems(cartNumber))
console.log('cartMixed:', getCartItems(cartMixed), '\n')
