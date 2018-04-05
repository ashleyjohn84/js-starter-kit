import { Subject } from "rxjs/Subject";
export class Example {
    private covered: boolean = false;
    private subject: Subject<string> = new Subject<string>();
    /* Some code in here :) */

    public coverageTest() {
        /* Should be uncovered. */
        this.covered = true;
    }
}
