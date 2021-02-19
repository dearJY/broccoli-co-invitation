// Check if the input value is equal to / greater than the least length.
export function validateTextInputLength(leastLength: number = 0, value: string): boolean {
    try {
        return value.trim().length >= leastLength;
    } catch {
        return false;
    }
}

// Check if the input value match the standard email format
export function validateEmailInput(value: string): boolean {
    try {
        const re = /\S+@\S+/;
        return re.test(value.trim());
    } catch {
        return false;
    }
}

// Check if the input value is equal to the target value.
export function validateConfirmInput(originalValue: string, currentValue: string) {
    try {
        return originalValue.trim() === currentValue.trim();
    } catch {
        return false;
    }
}