export function createMockStorage() {
    return {
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
    };
}
