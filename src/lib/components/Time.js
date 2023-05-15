class Time{
    static deltaTime = 1/60
    static time = 0
    static framecount = 0

    static update() {
        Time.time += Time.deltaTime
        Time.framecount++
    }
}

window.Time = Time
export default Time
