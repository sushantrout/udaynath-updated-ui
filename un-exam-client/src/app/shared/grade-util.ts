export class GradeUtil {
  getGradePoint(studentResult: any[]) : string{
    let internalMark = +studentResult[1];
    let semMark = +studentResult[2];
    let totalMark = internalMark + semMark;
    if(isNaN(internalMark) || isNaN(semMark) || semMark < 24) {
      return "F";
    } else {
      if (totalMark >= 90) {
        return "O";
      } else if (totalMark >= 80) {
        return "A+";
      } else if (totalMark >= 70) {
        return "A";
      } else if (totalMark >= 60) {
        return "B+";
      } else if (totalMark >= 50) {
        return "B";
      } else if (totalMark >= 45) {
        return "C";
      } else if (totalMark >= 40) {
        return "D";
      }
      return "F";
    }
  }

  creditPoint() {
    return 0;
  }
}
