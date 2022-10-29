export class GradeUtil {
  getGradePoint(paperResult : any): string {
    let totalMark = paperResult.acqureTotalResult;
    let internalMark = +paperResult.intMark;
    let semMark = +paperResult.semMark;
    if (paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 18)) {
      return 'F';
    } else if (!paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 24)) {
      return 'F';
    } else {
      if (totalMark >= 90) {
        return 'O';
      } else if (totalMark >= 80) {
        return 'A+';
      } else if (totalMark >= 70) {
        return 'A';
      } else if (totalMark >= 60) {
        return 'B+';
      } else if (totalMark >= 50) {
        return 'B';
      } else if (totalMark >= 45) {
        return 'C';
      } else if (totalMark >= 40) {
        return 'D';
      }
      return 'F';
    }
  }

  creditPoint(paperResult: any) {
    let totalMark = paperResult.acqureTotalResult;
    let internalMark = +paperResult.intMark;
    let semMark = +paperResult.semMark;
    let GP = 0;
    let cp = paperResult.cp;
    if (paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 18)) {
      return 0;
    } else if (!paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 24)) {
      return 0;
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

  sgpaDetail(uiResult: any) {
    let cpSum = 0;
    for (let result of uiResult) {
      let cp = +result.cp;
      if (cp && +cp && !isNaN(cp)) {
        cpSum = cpSum + cp;
      }
    }
    let total = 0;
    for (let resultdata of uiResult) {
      total = total + this.creditPoint(resultdata);
    }
    return total / cpSum;
  }


  checkForNumber(num: any) {
    if (isNaN(+num)) {
      return false;
    } else {
      return typeof +num == 'number';
    }
  }

  getFormatedResult(result : any) {
    if(result && (result+'').length != 0 && this.checkForNumber(result)) {
      return Math.round(result);
    } else {
      return result;
    }
  }

  getTotal(results : any) {
    let total = 0;
    for(let result of results) {
      total = total + result.acqureTotalResult;
    }
    return total;
  }
}
