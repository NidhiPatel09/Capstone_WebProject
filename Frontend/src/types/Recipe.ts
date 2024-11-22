export default interface Recipe {
    _id: string;
    title: string;
    ingredients: string[];
    directions: string[];
    link: string;
    source: string;
    NER: string[];
}