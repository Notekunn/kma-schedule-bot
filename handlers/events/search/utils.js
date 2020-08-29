const axios = require('axios').default;
const moment = require('moment-timezone');
const { TIME_FORMAT, TIME_ZONE } = process.env;
const api = axios.create({
    baseURL: process.env.SCHEDULE_SERVER,
    headers: {
        'Content-Type': 'application/json'
    }
});
const typeReplies = [
    {
        title: "Theo ngày",
        action: "SEARCH_SCHEDULE",
        type: "BY_DATE"
    },
    {
        title: "Theo tuần",
        action: "SEARCH_SCHEDULE",
        type: "BY_WEEK"
    }
];
const dateReplies = [
    {
        title: "Hôm nay",
        action: "SEARCH_SCHEDULE_BY_DATE",
        type: "THIS_DAY"
    }, {
        title: "Ngày mai",
        action: "SEARCH_SCHEDULE_BY_DATE",
        type: "NEXT_DAY"
    },
    {
        title: "Ngày khác",
        action: "SEARCH_SCHEDULE_BY_DATE",
        type: "OTHER_DAY"
    }
];
const weekReplies = [
    {
        title: "Tuần này",
        action: "SEARCH_SCHEDULE_BY_WEEK",
        type: "THIS_WEEK"
    }, {
        title: "Tuần sau",
        action: "SEARCH_SCHEDULE_BY_WEEK",
        type: "NEXT_WEEK"
    },
    {
        title: "Tuần khác",
        action: "SEARCH_SCHEDULE_BY_WEEK",
        type: "OTHER_WEEK"
    }
];
const makeButton = ({ title, action, type }) => {
    return {
        type: 'postback',
        title,
        payload: JSON.stringify({
            action,
            type
        })
    };
}

const getDate = (day) => {
    day = moment(day, TIME_FORMAT, TIME_ZONE);
    day = day.isValid() ? day : moment.tz(TIME_ZONE);
    return [day.format(TIME_FORMAT)];
}
const getDateInWeek = (day) => {
    const days = [];
    day = moment(day, TIME_FORMAT, TIME_ZONE);
    day = day.isValid() ? day : moment.tz(TIME_ZONE);
    for (let i = 0; i <= 6; i++) {
        days.push(day.day(i).format(TIME_FORMAT));
    }
    return days;
}
const groupBy = (iteratee = "day") => {
    return (arr) => {
        return arr.reduce((r, v, i, a, k = v[iteratee]) => ((r[k] || (r[k] = []))
            .push(v), r), {});
    }
}
const search = async (studentCode, days) => {
    const { data: { data: schedules, error } } = await api.post('/schedules/search/', {
        studentCode,
        days
    });
    if (error) throw Error(error.message);
    return schedules;
}
const getNextDay = function (skip = 1) {
    return moment.tz(TIME_ZONE).add(skip, 'days').format(TIME_FORMAT);
}

module.exports = {
    api,
    typeReplies,
    dateReplies,
    weekReplies,
    makeButton,
    getDate,
    getDateInWeek,
    search,
    groupBy,
    getNextDay
}