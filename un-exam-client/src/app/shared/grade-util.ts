export class GradeUtil {
  getGradePoint(paperResult : any, courseType : string): string {
    let practiaclPaper = false;
    if(!paperResult.intMarkId && !paperResult.semMarkId && paperResult.pracMarkId && paperResult.practicalPresent) {
      practiaclPaper = true;
    }

    let semFullMark = +paperResult.semFullMark;
    let intFullMark = +paperResult.intFullMark;
    let totalMarkR = paperResult.acqureTotalResult;
    let internalMark = +paperResult.intMark;
    let semMark = +paperResult.semMark;

    let semPassMark = 0;
    if(courseType == 'UG') {
      semPassMark = (30 / 100) * semFullMark;
    } else {
      semPassMark = (30 / 100) * semFullMark;
    }

    let totalMark = (totalMarkR / (+paperResult.fullMark)) * 100;

    if ((paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 18)) && !practiaclPaper) {
      return 'F';
    } else if ((!paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < semPassMark)) && !practiaclPaper) {
      return 'F';
    } else {
      if (totalMark >= 90) {
        return 'O';
      } else if (totalMark >= 80) {
        return 'A+';
      } else if (totalMark >= 70) {
        return 'A';
      } else if (totalMark >= 60) {
        return courseType == 'UG' ? 'B+' : 'B';
      } else if (totalMark >= 50) {
        return courseType == 'UG' ? 'B' : 'C';
      } else if ((totalMark >= 45 && courseType == 'UG') || (totalMark >= 40 && courseType != 'UG')) {
        return courseType == 'UG' ? 'C' : 'D';
      } else if ((totalMark >= 40 && courseType == 'UG') || (totalMark >= 30 && courseType != 'UG')) {
        return courseType == 'UG' ? 'D' : 'E';
      }
      return 'F';
    }
  }

  creditPoint(paperResult: any, courseType : string) {
    if(paperResult.paperType && paperResult.paperType == 'VALUES AND ETHICS') {
      return "";
    }
    let practiaclPaper = false;
    if(!paperResult.intMarkId && !paperResult.semMarkId && paperResult.pracMarkId && paperResult.practicalPresent) {
      practiaclPaper = true;
    }

    let semFullMark = +paperResult.semFullMark;
    let intFullMark = +paperResult.intFullMark;
    let totalMarkR = paperResult.acqureTotalResult;
    let internalMark = +paperResult.intMark;
    let semMark = +paperResult.semMark;
    let GP = 0;
    let cp = paperResult.cp;
    let totalMark = (totalMarkR / (+paperResult.fullMark)) * 100;

    let semPassMark = 0;
    if(courseType == 'UG') {
      semPassMark = (30 / 100) * semFullMark;
    } else {
      semPassMark = (30 / 100) * semFullMark;
    }

    if ((paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 18)) && !practiaclPaper) {
      return 0;
    } else if ((!paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < semPassMark)) && !practiaclPaper) {
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
      } else if ((totalMark >= 45 && courseType == 'UG') || (totalMark >= 40 && courseType != 'UG')) {
        GP = 5 * cp;
      } else if ((totalMark >= 40 && courseType == 'UG') || (totalMark >= 30 && courseType != 'UG')) {
        GP = 4 * cp;
      }
    }
    return GP;
  }

  sgpaDetail(uiResult: any, courseType : string) {
    let cpSum = 0;
    for (let result of uiResult) {
      if(!(result.paperType && result.paperType == 'VALUES AND ETHICS')) {
        let cp = +result.cp;
        if (cp && +cp && !isNaN(cp)) {
          cpSum = cpSum + cp;
        }
      }
    }
    let total = 0;
    for (let resultdata of uiResult) {
      if(!(resultdata.paperType && resultdata.paperType == 'VALUES AND ETHICS')) {
        let cp = this.creditPoint(resultdata, courseType);
        if(cp && (cp+"").length != 0) {
          total = total + (+(cp));
        }
      }
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
      if(!(result.paperType && result.paperType == 'VALUES AND ETHICS')) {
        total = total + result.acqureTotalResult;
      }
    }
    return total;
  }

  creditPointValue(paperResult: any, courseType : string) {
    if(paperResult.paperType && paperResult.paperType == 'VALUES AND ETHICS') {
      return "";
    }
    let practiaclPaper = false;
    if(!paperResult.intMarkId && !paperResult.semMarkId && paperResult.pracMarkId && paperResult.practicalPresent) {
      practiaclPaper = true;
    }

    let semFullMark = +paperResult.semFullMark;
    let intFullMark = +paperResult.intFullMark;
    let totalMarkR = paperResult.acqureTotalResult;
    let internalMark = +paperResult.intMark;
    let semMark = +paperResult.semMark;
    let GP = 0;
    let cp = paperResult.cp;
    let totalMark = (totalMarkR /  (+paperResult.fullMark)) * 100;

    let semPassMark = 0;
    if(courseType == 'UG') {
      semPassMark = (30 / 100) * semFullMark;
    } else {
      semPassMark = (30 / 100) * semFullMark;
    }

    if ((paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < 18)) && !practiaclPaper) {
      return 0;
    } else if ((!paperResult.practicalPresent && (isNaN(internalMark) || isNaN(semMark) || semMark < semPassMark)) && !practiaclPaper) {
      return 0;
    } else {
      if (totalMark >= 90) {
        return 10;
      } else if (totalMark >= 80) {
        return 9;
      } else if (totalMark >= 70) {
        return 8;
      } else if (totalMark >= 60) {
        return 7;
      } else if (totalMark >= 50) {
        return 6;
      } else if ((totalMark >= 45 && courseType == 'UG') || (totalMark >= 40 && courseType != 'UG')) {
        return 5;
      } else if ((totalMark >= 40 && courseType == 'UG') || (totalMark >= 30 && courseType != 'UG')) {
        return 4;
      }
    }
    return 0;
  }

  getResult(result : any, courseType : string) {
    let uiResults = result.uiResult;
    for(let ui of uiResults) {
      if(this.creditPoint(ui, courseType) == 0) {
        return 'FAIL';
      }
    }
    return 'PASS';
  }
}
