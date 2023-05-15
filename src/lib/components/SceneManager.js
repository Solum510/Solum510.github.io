class SceneManager{
    static scenes = [];
    static currentSceneIndex = 0;
    static changedSceneFlag = true;   
    static previousSceneIndex = -1;

    
    static addScene(scene){
        SceneManager.scenes.push(scene);
    }

    static getPreviousScene() {
        if(SceneManager.previousSceneIndex == -1){
            return
        }
        return SceneManager.scenes[SceneManager.previousSceneIndex]
    }
    static getActiveScene(){
        return SceneManager.scenes[SceneManager.currentSceneIndex];
    }

    static changeScene(index){
        SceneManager.previousSceneIndex = SceneManager.currentSceneIndex
        SceneManager.currentSceneIndex = index;
        SceneManager.changedSceneFlag = true;
    }

    static startScenes(scenes, title, settings = {}){
        SceneManager.setScenes(scenes)
        start(title, settings)
    }

    static setScenes(scenes){
        //Same as addScenes, but we clear any scenes first
        SceneManager.currentSceneIndex = 0;
        SceneManager.changedScene = true;
        SceneManager.scenes = []
        SceneManager.addScenes(scenes);
    }

    static addScenes(scenes){
        for(let scene of scenes){
            SceneManager.addScene(scene);
        }
    }
}

window.SceneManager = SceneManager