import {
  statSync,
  readdirSync 
} from "fs";

import { join } from "path";

const dirs = {
  list: function(path: string): string[] {
    return readdirSync(path, { withFileTypes: true })
    	.filter(dirent => dirent.isDirectory())
    	.map(dirent => dirent.name);
  },
}

const files = {
  list: function(path: string): string[] {
    return readdirSync(path);
  },

  listFileRecursive: function (dirPath: string, ret: string[] = []) {
    let stats
    let files = this.list(dirPath).map(f => join(dirPath, f))

    for (let file of files) {
      stats = statSync(file)

      if (stats.isDirectory() === false) {
          ret.push(file)
      } else {
          this.listFileRecursive(file, ret)
      }
    }
    return (ret.map(name => name
      .replace(dirPath + "/", ""))
    )
  }
}

export { dirs, files };
