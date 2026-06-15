const fs = require('fs');
const path = require('path');

const dir = 'd:/GREE INDIA/frontend/src';

function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
        const fullPath = path.join(currentPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('alert(')) {
                if (!content.includes("import toast")) {
                    let lines = content.split('\n');
                    let lastImport = -1;
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].startsWith('import ')) lastImport = i;
                    }
                    if (lastImport !== -1) {
                        lines.splice(lastImport + 1, 0, "import toast from 'react-hot-toast';");
                    } else {
                        lines.unshift("import toast from 'react-hot-toast';");
                    }
                    content = lines.join('\n');
                }
                
                content = content.replace(/alert\((.*?)\)/g, (match, p1) => {
                    const str = p1.toLowerCase();
                    if (str.includes('fail') || str.includes('error') || str.includes('critical') || str.includes('exceeds') || str.includes('please') || str.includes('invalid') || str.includes('wait') || str.includes('wrong')) {
                        return `toast.error(${p1})`;
                    } else {
                        return `toast.success(${p1})`;
                    }
                });
                
                fs.writeFileSync(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    }
}

walkDir(dir);
