import {useContext} from "preact/compat";
import {
    Dropdown,
    DropdownOption,
    DropdownOptionHeader,
    DropdownOptionValue,
    IconCode32
} from "@create-figma-plugin/ui";
import {h} from "preact";
import JSX = h.JSX;
import '!../output.css'
import {UICompanionContext, UICompanionContextProps} from "../store/UICompanionContext";

const RepositorySelection = () => {
    const {
        repositories,
        selectedRepository,
        setSelectedRepository
    }: UICompanionContextProps = useContext(UICompanionContext);

    const userReposOptions: DropdownOptionValue[] = repositories ? repositories.userRepos.map(repo => ({ value: repo })): [];
    const orgReposOptions: DropdownOption[] = repositories ? Object.entries(repositories.orgRepos).flatMap(([orgName, repos], index, array) => [
        { header: orgName } as DropdownOptionHeader,
        ...repos.map(repo => ({ value: repo } as DropdownOptionValue)),
        ...(index < array.length - 1 ? [{header: ''}] : []),
    ]) : [];

    const options: DropdownOption[] = [
        ...(userReposOptions.length > 0 ? [{ header: 'Own Repositories' }, ...userReposOptions, {header: ''}] : []),
        ...orgReposOptions
    ];

    function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
        const newSelectedRepository = event.currentTarget.value;
        console.log(newSelectedRepository);
        setSelectedRepository(newSelectedRepository);
    }

    return <Dropdown icon={<IconCode32 />} onChange={handleChange} options={options} value={selectedRepository} />;
}

export default RepositorySelection