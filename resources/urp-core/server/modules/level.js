import db from 'mysql2-wrapper';
import { executeSync } from '../libs/utils';



    const getExp = (source) => {
    const {ssn,exp} = source.playerData
    const result = await executeSync(    
        'SELECT * from characters  exp = ? WHERE ssn = ?',
        [ssn,exp]    
    );
    return result;
};
    const updateData = (source) => {
    ssn = source.playerData;
    source.playerData.level = level;
    source.playerData.exp = exp;
    db.update(
        'UPDATE characters SET level = ?, level=?, exp=? WHERE ssn = ?',
        [ssn,level,exp],
        undefined,
        alt.resourceName
    );
};

    let exp = await getExp();
    let currentLevel;
    let OnLevelUp;
    let MAX_EXP;
    let MAX_LEVEL = 99;
    let LevelUp = false;

   if  (LevelUp){    
        ssn = source.playerData;
        source.playerData.level = level;
        source.playerData.exp = GetXPforLevel(level);
           db.update(
        'UPDATE characters SET level = ?, level=?, exp=? WHERE ssn = ?',
        [ssn,level,exp],
        undefined,
        alt.resourceName
    );
        
    }

    function GetXPforLevel(level)
    {
        if (level > MAX_LEVEL)
            return 0;

         firstPass = 0;
         secondPass = 0;
        for (levelCycle = 1; levelCycle < level; levelCycle++)
        {
            firstPass += Math.Floor(levelCycle + (300.0 * Math.Pow(2.0, levelCycle / 7.0)));
            secondPass = firstPass / 4;
        }

        if(secondPass > MAX_EXP && MAX_EXP != 0)
            return MAX_EXP;

        if(secondPass < 0)
            return MAX_EXP;

        return secondPass;
    }

    function GetLevelForXP(exp)
    {
        if(exp > MAX_EXP)
            return MAX_EXP;

        firstPass = 0;
        secondPass = 0;
        for (levelCycle = 1; levelCycle <= MAX_LEVEL; levelCycle++)
        {
            firstPass += Math.Floor(levelCycle + (300.0 * Math.Pow(2.0, levelCycle / 7.0)));
            secondPass = firstPass / 4;
            if(secondPass >exp)
                return levelCycle;
        }
        if(exp > MAX_LEVEL)
            return MAX_LEVEL;

        return 0;
    }

    function AddExp(source, amount)
    {
        if(amount+ getExp < 0 || getExp > MAX_EXP)
        {
            if(getExp >MAX_EXP)
                getExp = MAX_LEVEL;
            return false;
        }
        oldLevel = GetLevelForXP(getExp);
        experience += amount;
        if(oldLevel < GetLevelForXP(getExp))
        {
            if(currentLevel < GetLevelForXP(getExp))
            {
                currentLevel = GetLevelForXP(getExp);
                if(OnLevelUp != null)
                    LevelUp = true;
                return true;
            }
        }
        return false;
    }
