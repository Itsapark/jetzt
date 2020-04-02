/**
 * Represents a single Next.js page
 *
 */
export declare class NextPage {
    private readonly path;
    private readonly sourcePath;
    private readonly buildOutputPath;
    /**
     *
     * @param path Relative (to .next/serverless/pages) path to page, e.g., `contact/about.tsx`
     * @param sourcePath Absolute path to `.next/serverless/pages` directory
     * @param buildOutputPath Absolute path to place modified pages in
     */
    constructor(path: string, sourcePath: string, buildOutputPath: string);
    /**
     * Indicates whether the page was statically pre-rendered
     */
    get isStatic(): boolean;
    /**
     * Indicates whether the page uses dynamic routing
     */
    get isDynamicallyRouted(): boolean;
    /**
     * Indicates whether the page is a special page, e.g., the error page
     */
    get isSpecial(): boolean;
    get route(): string;
    get processedRoute(): string;
    /**
     * Name of the page
     *
     * For example, for "pages/foo/contact.{ts,js,html}"" this will be "contact". For dynamic pages,
     * [foo] will be replaced with _foo_
     */
    get pageName(): string;
    get pageFileName(): string;
    get pageSourcePath(): string;
    get identifier(): string;
    /**
     * Absolute path to the target folder
     */
    get targetFolder(): string;
    get targetPath(): string;
    get targetPageName(): string;
    get targetPageFileName(): string;
    toString(): string;
}
/**
 * Represents the build output for a Next.js project
 */
export declare class NextBuild {
    private sourcePath;
    private _pages;
    constructor(sourcePath: string);
    init(buildOutputPath: string): Promise<void>;
    get pages(): NextPage[];
}
