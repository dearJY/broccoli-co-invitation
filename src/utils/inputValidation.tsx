export function validateTextInputLength(leastLength: number = 0, value: string): boolean {
    try {
        const strValue = new String(value);
        return strValue.trim().length >= leastLength;
    } catch {
        return false;
    }
}

export function validateEmailInput(value: string): boolean {
    try {
        const re = /\S+@\S+/;
        return re.test(value.trim());
    } catch {
        return false;
    }
}

export function validateConfirmInput(originalValue: string, currentValue: string) {
    try {
        return originalValue.trim() === currentValue.trim();
    } catch {
        return false;
    }
}