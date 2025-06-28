
export const  outputMatcher = (codeResponse, testcases) => {
    const outputs = codeResponse.split('---').map(o => o.trim());

    const results = testcases.map((tc, idx) => {
        const expected = tc.output.trim();
        const actual = outputs[idx].trim();
        return {
            input: tc.input,
            expected,
            actual,
            passed: expected === actual
        };
    });

    const verdict = "AC";

    results.forEach(result => {
        if(result.passed == false) {
            verdict = "WA";
        }
    });

    return {results, verdict};
};