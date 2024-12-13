export const validateCreateRecipe = (data: any): string[] => {
    const errors: string[] = [];
  
    if (!data.title || typeof data.title !== "string" || data.title.trim().length < 3) {
      errors.push("Title must be a string with at least 3 characters.");
    }
  
    if (
      !Array.isArray(data.ingredients) ||
      data.ingredients.some((i: string) => typeof i !== "string" || i.trim().length === 0)
    ) {
      errors.push("Ingredients must be an array of non-empty strings.");
    }
  
    if (
      !Array.isArray(data.instructions) ||
      data.instructions.some((i: string) => typeof i !== "string" || i.trim().length === 0)
    ) {
      errors.push("Instructions must be an array of non-empty strings.");
    }
  
    if (
      data.link &&
      (typeof data.link !== "string" || !/^https?:\/\/[^\s]+$/.test(data.link))
    ) {
      errors.push("Link must be a valid URL.");
    }
  
    if (data.source && typeof data.source !== "string") {
      errors.push("Source must be a string.");
    }
  
    if (
      data.NER &&
      (!Array.isArray(data.NER) || data.NER.some((ner: string) => typeof ner !== "string"))
    ) {
      errors.push("NER must be an array of strings.");
    }
  
    return errors; // Return the array of validation errors
  };
  
  export const validateUpdateRecipe = (data: any): string[] => {
    const errors: string[] = [];
  
    if (data.title && (typeof data.title !== "string" || data.title.trim().length < 3)) {
      errors.push("Title must be a string with at least 3 characters.");
    }
  
    if (
      data.ingredients &&
      (!Array.isArray(data.ingredients) ||
        data.ingredients.some((i: string) => typeof i !== "string" || i.trim().length === 0))
    ) {
      errors.push("Ingredients must be an array of non-empty strings.");
    }
  
    if (
      data.instructions &&
      (!Array.isArray(data.instructions) ||
        data.instructions.some((i: string) => typeof i !== "string" || i.trim().length === 0))
    ) {
      errors.push("Instructions must be an array of non-empty strings.");
    }
  
    if (
      data.link &&
      (typeof data.link !== "string" || !/^https?:\/\/[^\s]+$/.test(data.link))
    ) {
      errors.push("Link must be a valid URL.");
    }
  
    if (data.source && typeof data.source !== "string") {
      errors.push("Source must be a string.");
    }
  
    if (
      data.NER &&
      (!Array.isArray(data.NER) || data.NER.some((ner: string) => typeof ner !== "string"))
    ) {
      errors.push("NER must be an array of strings.");
    }
  
    return errors; // Return the array of validation errors
  };
  