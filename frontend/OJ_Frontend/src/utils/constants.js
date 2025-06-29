export const defaultCodeMap = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  // your code here\n  return 0;\n}`,
  python: `def main():\n    # your code here\n    pass\n\nif __name__ == \"__main__\":\n    main()`,
  java: `public class Main {\n  public static void main(String[] args) {\n    // your code here\n  }\n}`,
};

export const languagesMap = [
  { name: "C++", value: "cpp" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
];