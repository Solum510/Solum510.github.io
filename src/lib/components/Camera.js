import "./Component.js"
class Camera extends Component {
    name = "Camera"

    fillStyle

    constructor(fillStyle = "white"){
        super();
        this.fillStyle = fillStyle
    }

    


    static getLogicalScale(ctx) {
        let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
        let browserWidth = ctx.canvas.width
        if(EngineGlobals.requestedAspectRatio <= browserAspectRatio) {
            browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)
        }

        return browserWidth / EngineGlobals.logicalWidth
    }



    static getLogicalScaleZoomable(ctx){
        let brwoserAspectRatio = ctx.canvas.width / ctx.canvas.height
        let browserWidth = ctx.canvas.width
        if(EngineGlobals.requestedAspectRatio <= brwoserAspectRatio) {
            browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)
        }
        return browserWidth / EngineGlobals .logicalWidth * Camera.main.transform.sx
    }


    static getZeroes(ctx) {
        let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
        let zeroX = 0
        let zeroY = 0
        let browserWidth = ctx.canvas.width

        if(EngineGlobals.requestedAspectRatio > browserAspectRatio) {
            zeroY = (ctx.canvas.height - ctx.canvas.width / EngineGlobals.requestedAspectRatio) / 2
        } else {
            zeroX = (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio) / 2
        }

        return {zeroX, zeroY}
    }


    static screenToGUI(ctx, x, y) {
        let zeroes = Camera.getZeroes(ctx)

        let sx = Camera.getLogicalScale(ctx) 
        let sy = sx

        x -= zeroes.zeroX
        y -= zeroes.zeroY

        x /= sx
        y /= sy

        return {x, y}
    }

    static scrreenToWorld(ctx, x, y) {
        let sx = Camera.getLogicalScaleZoomable(ctx)
        let sy = sx
        x -= ctx.canvas.width / 2
        y -= ctx.canvas.height / 2

        x /= sx
        y /= sy

        x += Camera.main.transform.x
        y += Camera.main.transform.y

        return {x, y}
    }

    static GUIToScreen(ctx, x, y) {
        let logicalScale = Camera.getLogicalScale(ctx)
        let zeroes = Camera.getZeroes(ctx, x, y)

        x*= logicalScale
        y*= logicalScale
        x += zeroes.zeroX
        y += zedroes.zeroY

        return {x, y}
    }

    static GUIToWorld(ctx, x, y) {
        let logicalScale = Camera.getLogicalScale(ctx)
        let sx = Camera.getLogicalScaleZoomable(ctx)
        let sy = sx

        let zeroes = Camera.getZeroes(ctx, x, y) 
        x *= logicalScale
        y *= logicalScale

        x += zeroes.zeroX
        y += zeroes.zeroY

        x -= ctx.canvas.width / 2
        y -= ctx.canvas.height / 2

        x /= sx
        y /= sy
        x += Camera.main.transform.x
        y += Camera.main.transform.y

        return {x, y}
    }

    static worldToScreen(ctx, x, y) {
        let sx = Camera.getLogicalScaleZoomable(ctx)
        let sy = sx

        x -= Camera.main.transform.x
        y -= Camera.main.transform.y
        x *= sx
        y *= sy
        x += ctx.canvas.width / 2
        y += ctx.canvas.height / 2

        return {x, y}
    }

    static wroldToGUI(ctx, x, y) {
        let sxz = Camera.getLogicalScaleZoomable(ctx)
        let syz = sxz
        let sx = Camera.getLogicalScale(ctx)
        let sy = sx
        let zeroes = Camera.getZeroes(ctx)

        x -= Camera.main.transform.x
        y -= Camera.main.transform.y
        x *= sxz
        y *= syz
        x += ctx.canvas.width / 2
        y += ctx.canvas.height / 2
        x -= zeroes.zeroX
        y -= zeroes.zeroY

        x /= sx
        y /= sy
        return {x,y}
    }

    static get main(){
        let scene = SceneManager.getActiveScene();
        return scene.gameObjects[0]
    }
}

window.Camera = Camera;