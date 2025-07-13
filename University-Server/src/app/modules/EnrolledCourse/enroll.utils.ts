export const calculateGradeAndPoints = (totalMarks: any) => {
  let result = {
    grade: "NA",
    gradePoints: 0,
  };

  if (totalMarks >= 0 && totalMarks <= 19) {
    result = {
      grade: "F",
      gradePoints: 0.0,
    };
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    result = {
      grade: "D",
      gradePoints: 2.0,
    };
  } else if (totalMarks >= 85 && totalMarks < 90) {
    result = {
      grade: "A-",
      gradePoints: 3.7,
    };
  } else if (totalMarks >= 80 && totalMarks < 85) {
    result = {
      grade: "B+",
      gradePoints: 3.3,
    };
  } else if (totalMarks >= 90 && totalMarks <= 100) {
    result = {
      grade: "A",
      gradePoints: 4.0,
    };
  } else if (totalMarks >= 70 && totalMarks < 80) {
    result = {
      grade: "B-",
      gradePoints: 3.0,
    };
  }

  return result;
};
