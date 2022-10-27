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

  creditPoint(paperResult : any, studentResult : any) {
    let internalMark = +studentResult[1];
    let semMark = +studentResult[2];
    let totalMark = internalMark + semMark;
    let GP = 0;
    let cp = paperResult.cp;
    if(isNaN(internalMark) || isNaN(semMark) || semMark < 24) {
      GP = 0;
    } else {
      if (totalMark >= 90) {
        GP = 10 * cp;
      } else if (totalMark >= 80) {
        GP = 9 * cp;
      } else if (totalMark >= 70) {
        GP = 8 * cp;
      } else if (totalMark >= 60) {
        GP = 7 * cp;
      } else if (totalMark >= 50) {
        GP = 6 * cp;
      } else if (totalMark >= 45) {
        GP = 5 * cp;
      } else if (totalMark >= 40) {
        GP = 4 * cp;
      }
    }
    return GP;
  }

  sgpaDetail(uiResult : any) {
    let cpSum = 0;
    for(let result of uiResult) {
      let cp = +result.cp;
      if(cp && +cp && !isNaN(cp)) {
        cpSum = cpSum + cp;
      }
    }
    let total = 0;
    for(let resultdata of uiResult) {
      total = total + this.creditPoint(resultdata, resultdata.examMarkList);
    }
    return total / cpSum;
  }

  getTotal(uiResult : any) {
    let total = 0;
    for(let resultdata of uiResult) {
      total = total + this.getFullResult(resultdata.examMarkList);
    }
    return total;
  }

  getFullResult(examMarkList : any[]) : any{
    let total = 0;
    let f = true;
    for(let pr of examMarkList) {
      if(f) {
        f = false;
        continue;
      }
      if(this.checkForNumber(pr)) {
        total = total + (+pr);
      }
    }
    return total;
  }
  checkForNumber(num : any) {
    if(isNaN(+num)) {
      return false;
    } else {
      return typeof(+num) == 'number';
    }
  }
}
