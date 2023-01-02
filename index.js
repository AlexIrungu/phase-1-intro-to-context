// Your code here
function createEmployeeRecord(row){
    return{
        firstName:row[0],
        familyName:row[1],
        title:row[2],
        payPerHour:[3],
        timeInEvents:  [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
let createTimeInEvent = function(employee, dataStamp){
    let [date, hour] = dataStamp.split(' ')
    employee.timeInEvents.push({
        type: "Time in",
        hour: parseInt(hour, 10),
        date,
    })
    return employee 
}
let createTimeOutEvent = function(employee, dataStamp){
    let [date, hour] = dataStamp.split(' ')
    employee.timeOutEvents.push({
        type: 'Timeout',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedDate = function(employee, dataSought){
    let rawWage = hoursWorkedOnDate(employee, dataSought)
    * employee.payPerHour
    return parseFloat(rawWage.toString())
}
let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo , d){
        return memo + wagesEarnedDate(employee, d)
    }, 0)
    return payable
}
let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, e)
}