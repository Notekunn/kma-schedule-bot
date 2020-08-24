module.exports = function ({ name, drpSemester }) {
    let [number, start, end] = name.split('_');
    return {
        title: name,
        subtitle: `Học kỳ ${number} năm học ${start} - ${end}.`,
        buttons: [{
            title: 'Chọn học kỳ này',
            type: 'postback',
            payload: JSON.stringify({
                action: 'select_semester',
                drpSemester
            })
        }]
    }
}