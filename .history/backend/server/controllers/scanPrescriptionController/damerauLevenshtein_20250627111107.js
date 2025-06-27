function DamerauLevenshtein(str1, str2) {
  const lenStr1 = str1.length;
  const lenStr2 = str2.length;

  // Create a 2D matrix
  const matrix = Array.from({ length: lenStr1 + 1 }, () =>
    new Array(lenStr2 + 1).fill(0)
  );

  // Initialize first row and column
  for (let i = 0; i <= lenStr1; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= lenStr2; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= lenStr1; i++) {
    for (let j = 1; j <= lenStr2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost 
      );

      if (
        i > 1 &&
        j > 1 &&
        str1[i - 1] === str2[j - 2] &&
        str1[i - 2] === str2[j - 1]
      ) {
        matrix[i][j] = Math.min(
          matrix[i][j],
          matrix[i - 2][j - 2] + 1
        );
      }
    }
  }

  return matrix[lenStr1][lenStr2];
}
