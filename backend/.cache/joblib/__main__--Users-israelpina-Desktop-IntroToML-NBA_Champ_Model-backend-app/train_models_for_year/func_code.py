# first line: 25
@memory.cache
def train_models_for_year(cutoff_year):
    df = pd.read_csv('/Users/israelpina/Desktop/IntroToML/NBA_Champ_Model/backend/nba_adv_szn_stats.csv')

    rank_map = {
    'Champion': 6,
    'Finals': 5,
    'Conference Finals': 4,
    '2nd Round': 3,
    '1st Round': 2,
    'Play-In': 1,
    'Missed Playoffs': 0
}

    df['PLAYOFF_RESULT_ENCODED'] = df['PLAYOFF_RESULT'].map(rank_map)
    new_df = df[df['PLAYOFF_RESULT_ENCODED'] >= 1]

    new_df['CHAMPION'] = new_df['PLAYOFF_RESULT_ENCODED'].apply(finals_binary)

    filtered_df = new_df[new_df['SEASON'] < cutoff_year]
    cols_to_drop = ['Unnamed: 0',
                'TEAM_ID', 
                'TEAM_NAME', 
                'GP', 
                'W', 
                'L', 
                'W_PCT', 
                'MIN', 
                'E_OFF_RATING',
                'OFF_RATING', 
                'E_DEF_RATING', 
                'DEF_RATING', 
                'E_NET_RATING',
                'NET_RATING', 
                'AST_PCT', 
                'AST_TO', 
                'AST_RATIO', 
                'OREB_PCT', 
                'DREB_PCT',
                'REB_PCT', 
                'TM_TOV_PCT', 
                'EFG_PCT', 
                'TS_PCT', 
                'E_PACE', 
                'PACE',
                'PACE_PER40', 
                'POSS', 
                #'PIE', 
                'GP_RANK', 
                'W_RANK', 
                'L_RANK',
                'W_PCT_RANK', 
                'MIN_RANK', 
                #'OFF_RATING_RANK', 
                #'DEF_RATING_RANK',
                #'NET_RATING_RANK', 
                #'AST_PCT_RANK', 
                #'AST_TO_RANK', 
                #'AST_RATIO_RANK',
                #'OREB_PCT_RANK', 
                #'DREB_PCT_RANK', 
                #'REB_PCT_RANK', 
                #'TM_TOV_PCT_RANK',
                #'EFG_PCT_RANK', 
                #'TS_PCT_RANK', 
                #'PACE_RANK', 
                #'PIE_RANK', 
                'SEASON',
                'PLAYOFF_RESULT', 
                'PLAYOFF_RESULT_ENCODED', 
                'CHAMPION'
               ]
    X = filtered_df.drop(columns=cols_to_drop, errors='ignore')
    y = filtered_df['CHAMPION']

    scaler = StandardScaler()
    X_scaled_array = scaler.fit_transform(X)
    X_scaled = pd.DataFrame(X_scaled_array, index=X.index, columns=X.columns)

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=None, stratify=y, random_state=42)

    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

    xg = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
    xg.fit(X_resampled, y_resampled)

    lr = LogisticRegression(solver='lbfgs', max_iter=1000, class_weight='balanced')
    lr.fit(X_resampled, y_resampled)

    rf = RandomForestClassifier(class_weight='balanced', n_estimators=200, random_state=42)
    rf.fit(X_resampled, y_resampled)

    return lr, rf, xg, scaler
