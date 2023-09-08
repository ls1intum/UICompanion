export interface Issue {
    repository_url: string;
    number: number;
    title: string;
    description: string;
    status: string;
    frames: string[];
    prototypeUrls: string[];
}