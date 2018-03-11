import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class AppConfig {

    static settings;

    static load() 
    {
        const jsonFile = "assets/config/config." + environment.name + ".json";

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.overrideMimeType('application/json');
            xhr.open('GET', jsonFile, true);
            xhr.onreadystatechange = () => 
            {
                if (xhr.readyState === 4) 
                {
                    if (xhr.status === 200) 
                    {
                        this.settings = JSON.parse(xhr.responseText);
                        resolve();
                    } 
                    else
                    {
                        reject("Could not load file " + jsonFile + ": ${xhr.status}");
                    }
                }
            };
            xhr.send(null);
        });
    }
}