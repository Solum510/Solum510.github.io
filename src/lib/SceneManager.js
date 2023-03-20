class SceneManager{
    static scenes = [];
    static currentSceneIndex = 0;
    static changedSceneFlag = true;   
    
    
    static addScene(scene){
        SceneManager.scenes.push(scene);
    }

    static getActiveScene(){
        return SceneManager.scenes[SceneManager.currentSceneIndex];
    }

    static changeScene(index){
        SceneManager.currentSceneIndex = index;
        SceneManager.changedSceneFlag = true;
    }
}