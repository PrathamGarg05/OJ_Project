function normalize(output) {
  return output
    .trim()
    .split('\n')                           // split into lines
    .map(line => line.trim())              // trim trailing spaces
    .filter(line => line.length > 0)       // remove empty lines
    .sort()                                // sort lines to ignore ordering
    .join('\n');                           // rejoin
}


export const  outputMatcher = (codeResponse, testcases) => {
    const outputs = codeResponse.split('---').map(o => o.trim());
    let totalC = 0;
    const results = testcases.map((tc, idx) => {
        const expected = tc.output.trim();
        const actual = outputs[idx].trim();
        totalC += 1;
        return {
            id: tc._id,
            input: tc.input,
            expected,
            actual,
            passed: normalize(actual) === normalize(expected)
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