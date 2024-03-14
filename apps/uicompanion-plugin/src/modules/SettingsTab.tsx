import {h} from "preact";
import {emit} from "@create-figma-plugin/utilities";
import CustomTextField from "../components/CustomTextField";
import {Button, VerticalSpace} from "@create-figma-plugin/ui";
import '!../output.css'
import {StateUpdater} from "preact/hooks";

interface SettingsTabProps {
    githubToken: string
    setGithubToken: StateUpdater<string>
}

const SettingsTab = (props: SettingsTabProps) => {
    function handleSave() {
        console.log("Saving GitHub Access Token...");
        emit('SAVE-SETTINGS', {token: props.githubToken})
    }

    return (
        <div className="p-5">
            <div className="flex flex-col justify-between items-start">
                <CustomTextField
                    label="GitHub Access Token"
                    placeholder="ghp_..."
                    value={props.githubToken}
                    setValue={props.setGithubToken}
                    buttonLabel="Create a new token"
                    buttonLink="https://bit.ly/3SJKYQq"/>
            </div>
            <VerticalSpace space="extraLarge"/>
            <Button onClick={handleSave}>Save</Button>
        </div>
    )
}

export default SettingsTab