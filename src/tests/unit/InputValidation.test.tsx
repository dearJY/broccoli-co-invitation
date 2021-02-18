import { validateTextInputLength, validateEmailInput, validateConfirmInput } from '../../utils/inputValidation';

describe('validateTextInputLength works properly', () => {
    test('Returns true when value is longer than least length', () => {
        const result = validateTextInputLength(1, 'aa');
        expect(result).toBe(true);
    });

    test('Returns true when value is longer than least length after being trimmed', () => {
        const result = validateTextInputLength(1, '    aa');
        expect(result).toBe(true);
    });

    test('Returns false when value is shorter than least length', () => {
        const result = validateTextInputLength(2, 'a');
        expect(result).toBe(false);
    });

    test('Returns false when value is shorter than least length after being trimmed', () => {
        const result = validateTextInputLength(2, '    a');
        expect(result).toBe(false);
    });
});

describe('validateEmailInput works properly', () => {
    test('Returns true when input is in valid format', () => {
        const result = validateEmailInput('test@gmail.com');
        expect(result).toBe(true);
    });

    test('Returns false when input is in invalid format', () => {
        const result_1 = validateEmailInput('test');
        expect(result_1).toBe(false);

        const result_2 = validateEmailInput('');
        expect(result_2).toBe(false);
    })
});

describe('validateConfirmInput works properly', () => {
    test('Returns true when input matches target value', () => {
        const result = validateConfirmInput('test', 'test');
        expect(result).toBe(true);
    });

    test('Returns true when input matches target value after being trimmed', () => {
        const result = validateConfirmInput('test', '   test');
        expect(result).toBe(true);
    });

    test('Returns false when input does not match target value', () => {
        const result = validateConfirmInput('test', 'testtest');
        expect(result).toBe(false);
    })
})