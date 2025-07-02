
export const  outputMatcher = (codeResponse, testcases) => {
    const outputs = codeResponse.split('---').map(o => o.trim());
    let totalC = 0;
    const results = testcases.map((tc, idx) => {
        const expected = tc.output.trim();
        const actual = outputs[idx].trim();
        totalC += 1;
        return {
            input: tc.input,
            expected,
            actual,
            passed: expected === actual
        };
    });

    let verdict = "AC";
    let wrongC = 0;

    results.forEach(result => {
        if(result.passed == false) {
            verdict = "WA";
            wrongC += 1;
        }
    });

    return {results, verdict, totalC, wrongC};
};